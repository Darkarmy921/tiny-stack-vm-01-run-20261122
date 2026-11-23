const fs=require('fs'),I=process.argv[2]||process.env.MAKEFUN_INPUT_DIR||'/input',O=process.argv[3]||process.env.MAKEFUN_OUTPUT_DIR||'/output';
const T="#7W$,-12bbbbbbbb)))))))()))()))b)))bbbbbbbbbbbbbCDDC#bbbbbbbbbbb(%bbbbbbbbbbbbbb$$'$";
function run(P,B){
 const S=[],K=[],M=[],o=[];
 let p=s=k=j=t=0;
 try{for(;;){
  if(++t>1e6)throw 10;
  if(p>>>0>=P.length)throw 9;
  const c=P[p],x=T.charCodeAt(c)-35;
  if(!(x<63))throw 5;
  const pp=x&3,qq=x>>2&3,m=1<<(x>>4)>>1;
  if(p+m>=P.length)throw 9;
  if(s<pp)throw 2;
  if(s-pp+qq>256)throw 3;
  p+=1+m;
  if(!c)throw 0;
  if(c<3)S[s++]=c===1?P.readInt8(p-1):P.readInt32LE(p-4);
  else if(c>2&&c<8){
   if(c===3)s--;
   else if(c===5)[S[s-1],S[s-2]]=[S[s-2],S[s-1]];
   else if(c===7)[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];
   else S[s]=S[s-1-(c===6)],s++;
  }
  else if(c===23||c===27)S[s-1]=c<25?-S[s-1]|0:~S[s-1];
  else if(c>15&&c<35){
   const b=S[s-1],a=S[s-2],A=a>>>0,B=b>>>0;
   if(c>18&&c<23&&!b)throw 4;
   s-=2;S[s++]=[a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b|0,A/B|0,A%B|0,0,a&b,a|b,a^b,0,a<<b,a>>b,a>>>b|0,0,+(a===b),+(a<b),+(A<B)][c-16];
  }
  else if(c>47&&c<53){
   if(c>51){if(!k)throw 8;p=K[--k]}
   else if(c>50){if(k===64)throw 7;K[k++]=p;p=P[p-2]|P[p-1]<<8}
   else if(c===48||(c===49?S[--s]===0:S[--s]!==0))p=p+P.readInt16LE(p-2);
  }
  else if(c>63&&c<66){
   if(S[s-1]>>>0>255)throw 6;
   if(c===64)S[s-1]=M[S[s-1]]|0;else M[S[s-1]]=S[s-2],s-=2;
  }
  else if(c>=80){
   if(c<82){const b=c===80?Buffer.from(''+S[s-1]):[S[s-1]&255];if(o.length+b.length>65536)throw 11;s--;o.push(...b)}
   else if(c===82)S[s++]=j<B.length?B[j++]:-1;
   else throw S[--s]&255;
  }
 }}catch(e){return[o,e]}
}
for(d of fs.readdirSync(I)){
 e=O+'/'+d+'/',r=run(fs.readFileSync(I+'/'+d+'/program.bin'),fs.readFileSync(I+'/'+d+'/input.bin'));
 fs.mkdirSync(e,{recursive:true});
 fs.writeFileSync(e+'stdout.bin',Buffer.from(r[0]));
 fs.writeFileSync(e+'exit.txt',r[1]+'');
}
