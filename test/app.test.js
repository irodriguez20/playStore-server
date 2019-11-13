const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

describe("GET /apps", () => {
  it("should return an array of apps", () => {
    return request(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          "Genres",
          "App",
          "Rating",
          "Price",
          "Type",
          "Reviews"
        );
      });
  });

  it("should be 400 if sort is incorrect", () => {
    return request(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be one of rating or app");
  });

  it("should be 400 if sort is incorrect", () => {
    return request(app)
      .get("/apps")
      .query({ Genres: "MISTAKE" })
      .expect(
        400,
        "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card"
      );
  });
});
