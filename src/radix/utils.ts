import type { PriceMessage } from "@/axios/types";

export function priceMsgToString(msg: PriceMessage): string {
    return msg.data.map(el => el.marketId+"-"+el.price+"-"+el.nonce+"-"+el.createdAt).join(",");
}