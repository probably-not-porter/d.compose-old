// draw background
function update_background(){
    if (parallax_counter > width){
        parallax_counter = 0;
    }
    else{
        parallax_counter += parallax_speed;
    }
    ctx.drawImage(img_bg1, 0, 0,640,640);
    ctx.drawImage(img_bg2, 0 + parallax_counter, 0,640,640);
    ctx.drawImage(img_bg2, (-1*width) + parallax_counter, 0,640,640);
    ctx.drawImage(img_bg3, 0, 0,640,640);
}
