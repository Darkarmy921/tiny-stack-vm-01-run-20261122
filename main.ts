const fs=require('fs'),[,,I='/input',O='/output']=process.argv;
const T="#7W$,-12bbbbbbbb)))))))()))()))b)))bbbbbbbbbbbbbCDDC#bbbbbbbbbbb(%bbbbbbbbbbbbbb$$'$";
function run(P,B){
 const S=[],K=[],M=Array(256).fill(0),o=[];
 let p=0,s=0,k=0,j=0,t=0;
 for(;;){
  if(t===1e6)return[o,10];
  if(p<0||p>=P.length)return[o,9];
  const c=P[p],x=T.charCodeAt(c)-35;
  if(!(x<63))return[o,5];
  const pp=x&3,qq=x>>2&3,m=[0,1,2,4][x>>4];
  if(p+m>=P.length)return[o,9];
  t++;
  if(s<pp)return[o,2];
  if(s-pp+qq>256)return[o,3];
  const q=p+1+m;p=q;
  if(c===0)return[o,0];
  if(c<3)S[s++]=c===1?(P[q-1]<<24)>>24:P[q-4]|P[q-3]<<8|P[q-2]<<16|P[q-1]<<24;
  else if(c>=3&&c<=7){
   if(c===3)s--;
   else if(c===5){const v=S[s-1];S[s-1]=S[s-2];S[s-2]=v}
   else if(c===7){const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a}
   else{S[s]=S[s-1-(c===6)];s++}
  }
  else if(c===23)S[s-1]=-S[s-1]|0;
  else if(c===27)S[s-1]=~S[s-1];
  else if(c>=16&&c<=34){
   const b=S[s-1],a=S[s-2];
   if(c>=19&&c<=22&&!b)return[o,4];
   s-=2;S[s++]=[a+b|0,a-b|0,Math.imul(a,b),(a/b)|0,a%b|0,(a>>>0)/(b>>>0)|0,(a>>>0)%(b>>>0)|0,0,a&b,a|b,a^b,0,a<<b,a>>b,a>>>b|0,0,+(a===b),+(a<b),+((a>>>0)<(b>>>0))][c-16];
  }
  else if(c>=48&&c<=52){
   if(c===51){if(k===64)return[o,7];K[k++]=q;p=P[q-2]|P[q-1]<<8}
   else if(c===52){if(!k)return[o,8];p=K[--k]}
   else if(c===48||(c===49?S[--s]===0:S[--s]!==0))p=q+((P[q-2]|P[q-1]<<8)<<16>>16);
  }
  else if(c===64||c===65){
   if(S[s-1]<0||S[s-1]>255)return[o,6];
   if(c===64)S[s-1]=M[S[s-1]];else{M[S[s-1]]=S[s-2];s-=2}
  }
  else if(c>=80){
   if(c===80){const b=Buffer.from(String(S[s-1]));if(o.length+b.length>65536)return[o,11];s--;o.push(...b)}
   else if(c===81){if(o.length+1>65536)return[o,11];o.push(S[--s]&255)}
   else if(c===82)S[s++]=j<B.length?B[j++]:-1;
   else return[o,S[--s]&255];
  }
 }
}
const F=(d,f)=>fs.readFileSync(I+'/'+d+'/'+f);
for(const d of fs.readdirSync(I)){
 const e=O+'/'+d+'/',r=run(F(d,'program.bin'),F(d,'input.bin'));
 fs.mkdirSync(e,{recursive:true});
 fs.writeFileSync(e+'stdout.bin',Buffer.from(r[0]));
 fs.writeFileSync(e+'exit.txt',r[1]+'');
}
