const { RequestBuilder } = require("./builder_1");

const request = new RequestBuilder(
  "https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod"
)
  .setMethod("GET")
  .setUrl("/devices/wando02/sensors")
  .setQuery(["size=1", "b_time=10", "a_time=100"])
  .build();

console.log(request);
