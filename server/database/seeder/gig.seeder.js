import { faker } from "@faker-js/faker";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";
import Gig from "../../models/Gig.model.js";

const GigSeeder = {
  seed: async (number) => {
    // create user for these Gigs
    const user = {
      username: "Salma33",
      email: "Geovann333i@gmail.com",
      password: "123456",
      img: faker.image.sports(),
      country: "Egypt",
      phone: "01144108122",
      desc: faker.lorem.paragraph(),
      isSeller: true,
    };

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    // Insert User
    const insertedUser = new User({ ...user, password: hashedPassword });
    await insertedUser.save();

    for (let index = 0; index <= number; index++) {
      const gig = {
        title: faker.definitions.title,
        description: faker.lorem.paragraphs(2),
        totalStars: Math.floor(Math.random() * 20) + 1,
        starNumber: Math.floor(Math.random() * 5) + 1,
        category: faker.definitions.commerce.department.toString(),
        price: faker.commerce.price(10, 500),
        cover: faker.image.business(),
        images: faker.image.business(),
        userId: insertedUser._id,
        shortTitle: faker.definitions.title,
        shortDesc: faker.definitions.commerce.product_description.toString(),
        deliveryTime: faker.date.soon(3),
        revisionNumber: Math.floor(Math.random() * 100) + 1,
        features: [faker.commerce.productDescription()],
        sales: Math.floor(Math.random() * 100) + 1,
      };

      const insertedGig = new Gig(gig);
      await insertedGig.save();
    }
  },
};

export default GigSeeder;
