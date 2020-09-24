export const getNodeFromSelector=(selector: string | Element): Element=> {
    if(selector){
      if (selector instanceof Element) {
        return selector;
      }
      if (typeof selector === 'string') {
        const node = document.querySelector(selector);
        if (node) {
          return node;
        }
      }
    }
    return document.body;
}


export function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export const isValidKey=(key: any, obj: {[propName: string]: any}): key is keyof typeof obj=> {
  return key in obj;
}

export function isDef(val: any): boolean {
  return val !== undefined && val !== null;
}
