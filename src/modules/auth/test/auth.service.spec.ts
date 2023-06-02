import bcrypt from "bcrypt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../../user/user.service";

describe('Auth Service', () => {
    let service: AuthService;
    let mockUserService = {
        create: jest.fn(),
        findOne: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'my-jwt'
                })
            ],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('signup', () => {
        it('should success signup', async () => {
            const user = { username: 'alexa', password: 'test' };
            mockUserService.create.mockResolvedValue(user);
            mockUserService.findOne.mockResolvedValue(null);
            const result = await service.signup(user);
            expect(result.state).toBe(true);
            expect(result.message).toBe('signup_success');
            expect(result.token).toBeDefined();
        });

        it('should cancel signup for already username used', async () => {
            const user = { username: 'alexa', password: 'test' };
            mockUserService.findOne.mockResolvedValue(user);
            const result = await service.signup(user);
            expect(result.state).toBe(false);
            expect(result.message).toBe('already_username_used');
            expect(result.token).toBeDefined();
        });

        it('should generate token is worked', () => {
            const token = service.generateToken({ id: 'mongo-id', username: 'alexa' });
            expect(token).toBeDefined();
        });
    });

    describe('signin', () => {
        it('should success signin', async () => {
            const user = { username: 'alexa', password: 'test' };
            mockUserService.findOne.mockResolvedValue({
                ...user,
                ...{ password: bcrypt.hashSync(user.password, 6) }
            });
            const result = await service.signin(user);
            expect(result.state).toBe(true);
            expect(result.message).toBe('signin_success');
            expect(result.token).toBeDefined();
        });

        it('should cancel signup for invalid username', async () => {
            const user = { username: 'alexa', password: 'test' };
            mockUserService.findOne.mockResolvedValue(null);
            const result = await service.signin(user);
            expect(result.state).toBe(false);
            expect(result.message).toBe('invalid_information');
            expect(result.token).toBeDefined();
        });

        it('should cancel signup for invalid password', async () => {
            const user = { username: 'alexa', password: 'test' };
            mockUserService.findOne.mockResolvedValue({
                ...user,
                ...{ password: 'no-hash-pwd' }
            });
            const result = await service.signin(user);
            expect(result.state).toBe(false);
            expect(result.message).toBe('invalid_information');
            expect(result.token).toBeDefined();
        });

        it('should generate token is worked', () => {
            const token = service.generateToken({ id: 'mongo-id', username: 'alexa' });
            expect(token).toBeDefined();
        });
    });
});