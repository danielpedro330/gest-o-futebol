import { Team, type TeamProps } from "@/domain/Entites/Team";
import { UniqueEntityID } from "@/domain/Entites/unique-entity-id";
import { faker } from "@faker-js/faker";

export function makeTeams(override: Partial<TeamProps> = {}, id?: UniqueEntityID) {
    const team = Team.Create({
        name: faker.internet.displayName(),
        country: faker.location.country(),
        email: faker.internet.email(),
        league: faker.company.name(),
        logo: faker.image.urlLoremFlickr({ category: 'sports', width: 100, height: 100 }),
        password: faker.internet.password(),
        rank: faker.number.int({ min: 1, max: 100 }).toString(),
        ...override
    }, id);

    return team
    }