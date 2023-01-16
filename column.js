let frameCountDefault=80;
class Column {
    constructor(x, y, width, height,val) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue=[];
        this.value=(val/3);
    }
    moveTo(loc,move_ment_pos=1,frameCount=frameCountDefault)
    {
        // used for bubble sort
        for(let i=1;i<=frameCount;i++)
        {
            const t=i/frameCount;
            const vibrate=Math.sin(t*Math.PI);
            this.queue.push({
                x:lerp(this.x,loc.x,t),
                y:lerp(this.y,loc.y,t)+(move_ment_pos*vibrate*4)
            });
        }
    }
    jump(frameCount=frameCountDefault)
    {
        // used for bubble sort
        for(let i=1;i<=frameCount;i++)
        {
            const t=i/frameCount;
            const move_up=Math.sin(t*Math.PI);
            this.queue.push({
                x:this.x,
                y:this.y-(move_up*4)
            });
        }
    }
    draw(ctx,val_no) {
        // used for bubble sort
        var changed_taken=false;
        if(this.queue.length>0)
        {
            const {x,y}=this.queue.shift();
            this.x=x;
            this.y=y;
            changed_taken=true;
            const left = this.x - (this.width / 2);
            const top = this.y - this.height;
            const right = this.x + (this.width / 2);
            ctx.beginPath();
            ctx.fillStyle = "#FFEA20";
            // ctx.fillStyle = "#2B7A0B";
            ctx.moveTo(left, top);
            ctx.lineTo(left, this.y);
            ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, Math.PI, Math.PI * 2, true);
            ctx.lineTo(right, top);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="lightyellow";
            ctx.font = "15px Arial Bold";
            ctx.fillText(parseInt(this.value),left+spacing/6,this.y-this.height-10);
            ctx.fill();
            // ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "#FED049";
            // ctx.fillStyle = "orange";
            // ctx.fillStyle="white";
            ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        }
        else
        {
            const left = this.x - (this.width / 2);
            const top = this.y - this.height;
            const right = this.x + (this.width / 2);
            ctx.beginPath();
            ctx.fillStyle = "#810CA8";
            ctx.moveTo(left, top);
            ctx.lineTo(left, this.y);
            ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, Math.PI, Math.PI * 2, true);
            ctx.lineTo(right, top);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.font = "12px Loboster normal";    
            ctx.fillText(parseInt(this.value),left+spacing/6,this.y-this.height-10);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "#C147E9";
            // ctx.fillStyle="lightyellow";
            ctx.ellipse(this.x, top, this.width / 2, this.width / 5, 0, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
            // ctx.strokeStyle="lightgrey";
        }
        return changed_taken;
    }
}