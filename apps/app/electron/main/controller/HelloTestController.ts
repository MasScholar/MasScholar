// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck template test

@Controller("/user")
export class HelloTestController {
  @Get("/:id")
  @Validate(z.object({ name: z.string() }))
  async getUser(@PathParam('id') id: string, @QueryParam('name') name: string) {
    return { id, name };
  }

  @Post("/")
  async createUser(@Body() body: { name: string }) {
    console.log("Create user:", body);
    return { id: "123", ...body };
  }

  @Put("/:id")
  async updateUser(@PathParam('id') id: string, @Body() body: { name: string }) {
    console.log(`Update user ${id}:`, body);
    return { id, ...body };
  }

  @Delete("/:id")
  async deleteUser(@PathParam('id') id: string) {
    console.log(`Delete user ${id}`);
    return { success: true };
  }
}


