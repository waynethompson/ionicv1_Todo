import en from './en';

class Lang {
  _lang;

  setEnv(env) {
    switch (env) {
      default:
        this._lang = en;
    }
  }

  get(type):string {
    return this._lang[type];
  }
}

const l = new Lang();
l.setEnv();

export default l;