class Request {
  constructor(defaultUrl) {
    if (defaultUrl) {
      this.defaultUrl = defaultUrl;
      this.url = "";
      this.method = "GET";
      this.query = "";
      this.method === "POST" ? (this.data = data) : null;
    }
  }
}

class RequestBuilder {
  constructor(defaultUrl) {
    this.request = new Request(defaultUrl);
  }

  setUrl(url) {
    this.request.url = url;
    return this;
  }

  setMethod(method) {
    this.request.method = method;
    return this;
  }

  setData(data) {
    this.request.data = data;
    return this;
  }

  setQuery(query) {
    if (query) {
      const querys = `?${query.map((res) => res)}`;
      const requestQuery = querys.replaceAll(",", "&");
      this.request.query = requestQuery;
    }

    return this;
  }

  build() {
    const { request } = this;
    request.requestUrl = `${request.defaultUrl}${request.url}${
      request.query && request.query
    }`;
    return request;
  }
}

module.exports = { RequestBuilder };

// https://rojy53nt54.execute-api.ap-northeast-2.amazonaws.com/Prod/
