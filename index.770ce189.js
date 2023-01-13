class t{width=1768;x=0;y=0;constructor(t,e,i){this.game=t,this.image=e,this.speedModifier=i,this.height=this.game.height}update(){this.x<=-this.width?this.x=0:this.x-=this.game.speed*this.speedModifier}draw(){this.game.ctx.drawImage(this.image,this.x,this.y),this.game.ctx.drawImage(this.image,this.x+this.width,this.y)}}class e{layers=[];topLayers=[];constructor(e){this.game=e;const i=document.getElementById("layer1"),s=document.getElementById("layer2"),h=document.getElementById("layer3"),a=document.getElementById("layer4");this.layers=[new t(this.game,i,.2),new t(this.game,s,.4),new t(this.game,h,1)],this.topLayers=[new t(this.game,a,1.5)]}update(){this.layers.forEach((t=>t.update()))}postUpdate(){this.topLayers.forEach((t=>t.update()))}draw(){this.layers.forEach((t=>t.draw()))}postDraw(){this.topLayers.forEach((t=>t.draw()))}}class i{controlKeys=["ArrowUp","ArrowDown"];shootKey=" ";constructor(t){this.game=t,window.addEventListener("keydown",(t=>{this.controlKeys.includes(t.key)&&!this.game.keys.includes(t.key)&&this.game.keys.push(t.key),this.shootKey===t.key&&this.game.player.shoot(),"d"===t.key&&(this.game.debug=!this.game.debug)})),window.addEventListener("keyup",(t=>{const e=this.game.keys.indexOf(t.key);e>-1&&this.game.keys.splice(e,1)}))}}class s{updateSprite(){this.frameX<this.maxFrame?this.frameX++:this.frameX=0}drawSprite(){this.game.ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height),this.game.debug&&this.game.ctx.strokeRect(this.x,this.y,this.width,this.height)}}class h extends s{markedForDelete=!1;frameX=0;constructor(t){super(),this.game=t,this.x=t.width,this.speedX=-1.5*Math.random()-.5}update(){this.x+=this.speedX-this.game.speed,this.x+this.width<0&&(this.markedForDelete=!0),this.updateSprite()}draw(){this.drawSprite(),this.game.debug&&(this.game.ctx.fillStyle="black",this.game.ctx.font="20px Helvetica",this.game.ctx.fillText(this.lives.toString(),this.x,this.y))}}class a extends h{width=228;height=169;score=2;lives=2;image=document.getElementById("angler1");frameY=Math.floor(3*Math.random());maxFrame=37;type="angler1";constructor(t){super(t),this.y=Math.random()*(.9*t.height-this.height)}}class r extends h{width=213;height=165;score=3;lives=3;image=document.getElementById("angler2");frameY=Math.floor(2*Math.random());maxFrame=37;type="angler2";constructor(t){super(t),this.y=Math.random()*(.9*t.height-this.height)}}class m extends h{width=115;height=95;score=3;lives=3;image=document.getElementById("drone");frameY=Math.floor(2*Math.random());maxFrame=39;type="drone";constructor(t){super(t),this.y=Math.random()*(.9*t.height-this.height)}}class o extends h{width=99;height=95;score=0;lives=3;image=document.getElementById("lucky");frameY=Math.floor(2*Math.random());maxFrame=37;type="lucky";constructor(t){super(t),this.y=Math.random()*(.9*t.height-this.height)}}class d{width=10;height=3;speed=3;markForDelete=!1;image=document.getElementById("bullet");constructor(t,e,i){this.game=t,this.x=e,this.y=i}update(){this.x+=this.speed,this.width>.8*this.game.width&&(this.markForDelete=!0)}draw(){this.game.ctx.drawImage(this.image,this.x,this.y)}}class n extends s{width=120;height=190;x=20;y=100;frameX=0;frameY=0;maxFrame=37;speedY=0;maxSpeed=3;bullets=[];image=document.getElementById("player");powerUp=!1;powerUpTimer=0;powerUpLimit=5e3;constructor(t){super(),this.game=t}update(t){this.game.keys.includes("ArrowUp")?this.speedY=-this.maxSpeed:this.game.keys.includes("ArrowDown")?this.speedY=this.maxSpeed:this.speedY=0,this.y+=this.speedY;const e=this.game.height-.5*this.height,i=.5*-this.height;this.y>e?this.y=e:this.y<i&&(this.y=i),this.bullets.forEach((t=>t.update())),this.bullets=this.bullets.filter((t=>!t.markForDelete)),this.updateSprite(),this.powerUp&&(this.powerUpTimer>this.powerUpLimit?(this.powerUpTimer=0,this.powerUp=!1,this.frameX=0):(this.powerUpTimer+=t,this.frameY=1,this.game.ammo+=.1))}draw(){this.bullets.forEach((t=>t.draw())),this.drawSprite()}shoot(){this.game.ammo>0&&(this.bullets.push(new d(this.game,this.x+90,this.y+33)),this.game.ammo--),this.powerUp&&this.bottomShoot()}bottomShoot(){this.game.ammo>0&&(this.bullets.push(new d(this.game,this.x+90,this.y+175)),this.game.ammo--)}enterPowerUp(){this.powerUp=!0,this.powerUpTimer=0}}class l{image=document.getElementById("gears");frameX=Math.floor(3*Math.random());frameY=Math.floor(3*Math.random());width=50;height=50;sizeModifier=parseFloat((.5*Math.random()+.5).toFixed(1));size=this.width*this.sizeModifier;speedX=6*Math.random()-3;speedY=-15*Math.random();gravity=.5;markedForDelete=!1;angle=0;angleVelocity=.2*Math.random()-.1;bounced=2;bottomBounceBorder=100*Math.random()+60;constructor(t,e,i){this.game=t,this.x=e,this.y=i}update(){this.angle+=this.angleVelocity,this.speedY+=this.gravity,this.x-=this.speedX+this.game.speed,this.y+=this.speedY,(this.y>this.game.height+this.size||this.x<0-this.size)&&(this.markedForDelete=!0),this.y>this.game.height-this.bottomBounceBorder&&this.bounced>0&&(this.bounced--,this.speedY*=-.5)}draw(){this.game.ctx.save(),this.game.ctx.translate(this.x,this.y),this.game.ctx.rotate(this.angle),this.game.ctx.drawImage(this.image,this.frameX*this.size,this.frameY*this.size,this.width,this.height,-.5*this.size,-.5*this.size,this.width,this.height),this.game.ctx.restore()}static generateParticles(t,e,i,s=1){const h=[];for(let a=0;a<s;a++)h.push(new l(t,e,i));return h}}class g{fontSize=25;fontFamily="Bangers";color="yellow";constructor(t){this.game=t}draw(){const t=this.game.ctx;t.save(),t.font=this.fontSize+"px "+this.fontFamily,t.fillStyle="white",t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowColor="black",t.fillText("Score: "+this.game.score,20,40),t.fillStyle=this.game.player.powerUp?this.color:"white";for(let e=0;e<this.game.ammo;e++)t.fillRect(20+5*e,50,3,20);t.fillStyle="white";const e=(.001*this.game.gameTime).toFixed(1);if(t.fillText("Timer: "+e,20,100),this.game.gameOver){t.textAlign="center";let e="You Lost!",i="Try Again Next Time!";this.game.winningScore<this.game.score&&(e="You Win!",i="Well Done!"),t.fillStyle="white",t.font="50px "+this.fontFamily,t.fillText(e,.5*this.game.width,.5*this.game.height-30),t.font="25px "+this.fontFamily,t.fillText(i,.5*this.game.width,.5*this.game.height+30)}t.restore()}}const c=new class{width=1024;height=500;score=0;keys=[];enemies=[];particles=[];debug=!1;gameTime=0;timeLimit=5e6;speed=1;ammo=20;maxAmmo=50;ammoTimer=0;ammoInterval=500;enemyInterval=1e3;enemyTimer=0;winningScore=20;gameOver=!1;constructor(){this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=this.width,this.canvas.height=this.height,this.player=new n(this),this.control=new i(this),this.ui=new g(this),this.background=new e(this)}update(t){this.gameOver||(this.gameTime+=t),this.gameTime>this.timeLimit&&(this.gameOver=!0),this.ctx.fillStyle="#4d79bc",this.ctx.fillRect(0,0,this.width,this.height),this.background.update(),this.player.update(t),this.ammoTimer>this.ammoInterval?(this.ammo<this.maxAmmo&&this.ammo++,this.ammoTimer=0):this.ammoTimer+=t,this.enemies.forEach((t=>{if(t.update(),this.checkCollistions(this.player,t)){if(t.markedForDelete=!0,"lucky"===t.type&&this.player.enterPowerUp(),!this.gameOver){this.score-=t.score;const e=t.x+.5*t.width,i=t.y+.5*t.width;this.particles.push(...l.generateParticles(this,e,i,6))}this.score<0&&(this.gameOver=!0)}this.player.bullets.forEach((e=>{if(this.checkCollistions(e,t)){t.lives--;const i=t.x+.5*t.width,s=t.y+.5*t.width;this.particles.push(...l.generateParticles(this,i,s)),t.lives<=0&&(t.markedForDelete=!0,this.particles.push(...l.generateParticles(this,i,s,4)),this.gameOver||(this.score+=t.score),this.winningScore<this.score&&(this.gameOver=!0)),e.markForDelete=!0}}))})),this.enemies=this.enemies.filter((t=>!t.markedForDelete)),this.enemyTimer>this.enemyInterval&&!this.gameOver?(this.addEnemy(),this.enemyTimer=0):this.enemyTimer+=t,this.particles.forEach((t=>t.update())),this.particles=this.particles.filter((t=>!t.markedForDelete)),this.background.postUpdate()}draw(){this.background.draw(),this.player.draw(),this.enemies.forEach((t=>t.draw())),this.particles.forEach((t=>t.draw())),this.ui.draw(),this.background.postDraw()}addEnemy(){const t=[o,a,r,m],e=t[Math.floor(Math.random()*(t.length-1))];this.enemies.push(new e(this))}checkCollistions(t,e){return t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y}};let p=0;!function t(e){const i=e-p;p=e,c.update(i),c.draw(),requestAnimationFrame(t)}(0);
//# sourceMappingURL=index.770ce189.js.map
