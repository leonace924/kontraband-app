export default class LoadingHolder {
  static loading;

  static setLoading(loading) {
    this.loading = loading;
  }

  static getLoading() {
    return this.loading;
  }
}
