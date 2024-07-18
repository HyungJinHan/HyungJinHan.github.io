const {
  abstractFactory,
  Emperor,
  Governor,
  Runner,
} = require("./abstract_factory_1");

abstractFactory.addJob("emperor", Emperor);
abstractFactory.addJob("governor", Governor);
abstractFactory.addJob("runner", Runner);

let emperorInfo = {
  nero: { name: "Nero" },
};
let governorInfo = {
  vindex: { name: "Vindex" },
  galba: { name: "Galba" },
  otho: { name: "Otho" },
  vitellius: { name: "Vitellius" },
  rufus: { name: "Rufus" },
};

const nero = abstractFactory.create("emperor", emperorInfo.nero);
const runner_nero = abstractFactory.create("runner", emperorInfo.nero);
const vindex = abstractFactory.create("governor", governorInfo.vindex);
const galba = abstractFactory.create("governor", governorInfo.galba);
const otho = abstractFactory.create("governor", governorInfo.otho);
const vitellius = abstractFactory.create("governor", governorInfo.vitellius);
const rufus = abstractFactory.create("governor", governorInfo.rufus);

nero.proclaim();
nero.attack("All");

vindex.betray();
vindex.attack(emperorInfo.nero.name);

galba.betray();
galba.attack(emperorInfo.nero.name);

otho.betray();
otho.attack(emperorInfo.nero.name);

vitellius.betray();
vitellius.attack(emperorInfo.nero.name);

rufus.betray();
rufus.attack(emperorInfo.nero.name);

runner_nero.run();
