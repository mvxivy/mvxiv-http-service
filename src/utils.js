export function setCommonHeader(key, value) {
  delete this.defaults.headers[key];
  delete this.defaults.headers.common[key];
  this.defaults.headers.common[key] = value;
}

export function setInterseptors(interceptors) {
  Object.entries(interceptors).forEach(([type, intcpTuples]) => {
    intcpTuples.forEach(tuple => this.interceptors[type].use(...tuple));
  });
}
