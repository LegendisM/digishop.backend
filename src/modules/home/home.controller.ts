import { Controller, Get, Render } from "@nestjs/common";

@Controller({
    path: '/'
})
export class HomeContoller {
    constructor() { }

    @Get()
    @Render('home')
    index() {
        return { title: "Home", products: [] };
    }

}