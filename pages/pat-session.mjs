/* Browser-owned credentials ONLY. Never prefilled or sent to any host except
 * api.github.com by the fixed GitHub transport. Storage is NOT encrypted. */
export const SESSION_PAT_KEY='laoli-github-pat-session-v1';
export const REMEMBER_PAT_KEY='laoli-github-pat-remember-v1';
export class PATSession {
 constructor({sessionStorage,localStorage}) {this.session=sessionStorage;this.local=localStorage;}
 get(){return this.session.getItem(SESSION_PAT_KEY)||this.local.getItem(REMEMBER_PAT_KEY)||'';}
 remembered(){return !!this.local.getItem(REMEMBER_PAT_KEY);}
 set(value,remember=false){
  const token=value.trim();
  if(!token || /\s/.test(token))throw new Error('PAT不能为空或包含空白');
  // Write chosen storage first; quota/security failures do not silently discard old credentials.
  (remember?this.local:this.session).setItem(remember?REMEMBER_PAT_KEY:SESSION_PAT_KEY,token);
  (remember?this.session:this.local).removeItem(remember?SESSION_PAT_KEY:REMEMBER_PAT_KEY);
 }
 clear(){this.session.removeItem(SESSION_PAT_KEY);this.local.removeItem(REMEMBER_PAT_KEY);}
}
