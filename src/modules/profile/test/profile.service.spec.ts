import { Test, TestingModule } from "@nestjs/testing";
import { ProfileService } from "../profile.service";
import { UserService } from "../../user/user.service";
import { User } from "../../user/schema/user.schema";

describe('Profile Service', () => {
    let service: ProfileService;
    let mockUserService = {
        findOne: jest.fn(),
        findById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfileService,
                {
                    provide: UserService,
                    useValue: mockUserService
                }
            ]
        }).compile();

        service = module.get<ProfileService>(ProfileService);
    });

    it('should create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('get profile', () => {
        it('should find user profile', async () => {
            const user = { username: 'alexa', email: 'a@b.com' } as User;
            mockUserService.findOne.mockResolvedValue(user);
            const profile = await service.find(user.username);
            expect(profile).toBeDefined();
            expect(profile.username).toBe(user.username);
        });

        it('should get null for invalid user profile', async () => {
            mockUserService.findOne.mockResolvedValue(null);
            const profile = await service.find('alexa-wrong');
            expect(profile).toBe(null);
        });
    });

    describe('update profile', () => {
        it('invalid user for update', async () => {
            const user = { username: 'alexa', email: 'a@b.com', nationalcode: '', avatar: '' } as User;;
            mockUserService.findById.mockResolvedValue(null);
            mockUserService.findOne.mockResolvedValue(null);
            const result = await service.update('mongo-id', user);
            expect(result).toBeDefined();
            expect(result.state).toBe(false);
            expect(result.message).toBe('already_information_used');
        });

        it('already information used', async () => {
            const user = { username: 'alexa', email: 'a@b.com', nationalcode: '', avatar: '' } as User;
            mockUserService.findById.mockResolvedValue(user);
            mockUserService.findOne.mockResolvedValue(user);
            const result = await service.update('mongo-id', user);
            expect(result).toBeDefined();
            expect(result.state).toBe(false);
            expect(result.message).toBe('already_information_used');
        });

        it('successfully profile updated', async () => {
            const user = { username: 'alexa', email: 'a@b.com', nationalcode: '', avatar: '' } as User;;
            mockUserService.findById.mockResolvedValue({ ...user, ...{ updateOne: () => { } } });
            mockUserService.findOne.mockResolvedValue(null);
            const result = await service.update('mongo-id', user);
            expect(result).toBeDefined();
            expect(result.state).toBe(true);
            expect(result.message).toBe('update_success');
        });
    });
});