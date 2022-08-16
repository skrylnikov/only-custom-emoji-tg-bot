import { Context } from "grammy";
import LRUCache from "lru-cache";

const cache = new LRUCache<number, boolean>({ max: 100, ttl: 60 * 1000 });

export const getBotRights = async (ctx: Context) => {
  if(!ctx.chat){
    return false;
  }
  if(cache.has(ctx.chat.id)){
    return cache.get(ctx.chat.id);
  }
  const chatAdminList = await ctx.getChatAdministrators();

  const me = chatAdminList.find((x) => x.user.id === ctx.me.id);

  const result = me && (me.status === 'creator' || me.can_delete_messages) || false;

  cache.set(ctx.chat.id, result);

  return result;
};


