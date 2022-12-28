// Start the game
window.addEventListener("load", function () {
    const main_menu = document.getElementById("main_menu");
    const level_menu = document.getElementById("level_menu");
    const overlay_menu = document.getElementById("overlay_menu");
    const bar = document.getElementById("bar");

    
});

let return_to_home = 0;
let threshold = 100;

function button_play(){
    running = true;
    load_level(1);
    starting_offset();
    engine_update();

    overlay_menu.style.display = "inline-block";
    level_menu.style.display = "none";
    main_menu.style.display = "none";
}
function return_to_main(){
    return_to_home = 0;
    running = false;
    document.getElementById("canvas").innerHTML = "";
    ctx.clearRect(0, 0, width, height);

    overlay_menu.style.display = "none";
    level_menu.style.display = "none";
    main_menu.style.display = "inline-block";
}

function update_menu(){
    let width = document.getElementById("canvas").width;
    let bar = document.getElementById("bar");
    let label = document.getElementById("bar_label");
    if(keys[27]){
        return_to_home += 1;
    }else if (return_to_home > 0){
        return_to_home -= 3;
    }
    // update bar
    bar.style.marginLeft = ((return_to_home / threshold) * (width / 2)) + "px";
    bar.style.marginRight = ((return_to_home / threshold) * (width / 2)) + "px";
    bar.style.opacity = return_to_home / (threshold / 5);
    label.style.opacity = return_to_home / (threshold / 5);
    if (return_to_home > 150){
        return_to_main();
    }
}
