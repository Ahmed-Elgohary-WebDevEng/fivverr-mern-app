import { faker } from "@faker-js/faker";
import User from "../../models/User.model.js";

const UserSeeder = {
  seed: async (number) => {
     for (let index = 0; index <= number; index ++) {
       const user = {
         username: faker.name.firstName(),
         email: `${faker.name.firstName()}@gmail.com`,
         password: faker.phone.number(),
         img: faker.image.sports(),
         country: faker.address.country(),
         phone: faker.phone.number(),
         desc: faker.lorem.paragraph(),
         isSeller: false,
       };

       // Insert User
       const insertedUser = new User(user);
       await insertedUser.save();
     }
  },
};

export default UserSeeder;
