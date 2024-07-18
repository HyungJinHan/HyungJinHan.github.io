const data = {
  users: {
    u1: "UserName1",
    u2: "UserName2",
    u3: "UserName3",
    u4: "UserName4",
  },
  groups: {
    FP: ["u1", "u2", "u3"],
    OOP: ["u2", "u3"],
  },
  friends: {
    u1: ["u2", "u3"],
    u2: ["u1", "u3", "u4"],
    u3: ["u2"],
  },
};

// 실제 요청 처리 API

function friendsOfN(idList) {
  return Promise.resolve(idList.map((id) => data.friends[id]));
}

function memberOfGroup_(gId, uId) {
  return Promise.resolve(data.groups[gId].indexOf(uId) >= 0);
}

function getNameN(idList) {
  return Promise.resolve(idList.map((id) => data.users[id]));
}

// run/step

function step(stack, value) {
  while (stack.length > 0) {
    const top = stack.pop();
    if (top instanceof Request) {
      const r = { request: top.request };
      return {
        blocked: [r],
        next: () => step(stack, r.value),
      };
    } else if (Array.isArray(top)) {
      const values = top.map((g) => step([g]));
      if (values.every((v) => "done" in v)) {
        value = values.map((v) => v.done);
      } else {
        return {
          blocked: values.reduce((a, b) => a.concat(b.blocked || []), []),
          next: function next() {
            for (const i in values) {
              if ("blocked" in values[i]) {
                values[i] = values[i].next();
              }
            }
            if (values.every((v) => "done" in v)) {
              return step(
                stack,
                values.map((v) => v.done)
              );
            } else {
              return {
                blocked: values.reduce((a, b) => a.concat(b.blocked || []), []),
                next,
              };
            }
          },
        };
      }
    } else if (typeof top.next === "function") {
      const r = top.next(value);
      if (r.done) {
        value = r.value;
      } else {
        stack.push(top); // top not finished
        stack.push(r.value);
      }
    }
  }
  return { done: value };
}

async function run(g, process) {
  let next = () => step([g()]);
  while (true) {
    const r = next();
    if ("done" in r) return r.done;
    await process(r.blocked);
    next = r.next;
  }
}

// generator를 위한 API

function Request(request) {
  this.request = request;
}

function friendsOf(id) {
  return new Request({ type: "friendsOf", id });
}

function memberOfGroup(gId, uId) {
  return new Request({ type: "memberOfGroup", gId, uId });
}

function getName(id) {
  return new Request({ type: "getName", id });
}

//

async function process(requests) {
  console.log(requests);
  const batches = {};
  requests.forEach((r) => {
    batches[r.request.type] = batches[r.request.type] || [];
    batches[r.request.type].push(r);
  });
  const ps = Object.keys(batches).map((type) => {
    if (type === "friendsOf") {
      return friendsOfN(batches[type].map((r) => r.request.id)).then((names) =>
        batches[type].map((r, i) => (r.value = names[i]))
      );
    }
    if (type === "memberOfGroup") {
      return Promise.all(
        batches[type].map((r) =>
          memberOfGroup_(r.request.gId, r.request.uId).then(
            (v) => (r.value = v)
          )
        )
      );
    }
    if (type === "getName") {
      return getNameN(batches[type].map((r) => r.request.id)).then((names) =>
        batches[type].map((r, i) => (r.value = names[i]))
      );
    }
  });
  await Promise.all(ps);
}

// biz logic

function* fpFriends(id) {
  const friends = yield friendsOf(id);
  const fp = yield friends.map((f) => memberOfGroup("FP", f));
  return yield friends.filter((f, i) => fp[i]).map(getName);
}

function* commonFpFriends(id1, id2) {
  const [fs1, fs2] = yield [fpFriends(id1), fpFriends(id2)];
  return intersect(fs1, fs2);
}

function intersect(as, bs) {
  as = new Set(as);
  return bs.filter((b) => as.has(b));
}

run(function* () {
  console.log(yield commonFpFriends("u1", "u2"));
}, process);

function intersect(as, bs) {
  as = new Set(as);
  return bs.filter((b) => as.has(b));
}
