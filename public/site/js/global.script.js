$(document).on("click", "button", function () {
    let link = $(this).data("link");
    if (link) {
        window.location = link;
    }
});