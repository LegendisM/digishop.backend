import request from "supertest";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/modules/app/app.module";
import { APP_PIPE } from "@nestjs/core";

describe('App', () => {
  let app: INestApplication;
  let token;
  let authBrokenData = { username: 't' };
  let authUnknownata = { username: 'unknown', password: 'test' };
  let authFixedData = { username: `test${Date.now()}`, password: 'test' };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({ whitelist: true, transform: true })
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Auth Module', () => {
    describe('→ POST /auth/signup', () => {
      it('should return 400 on missing dto', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(authBrokenData);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeInstanceOf(Array<String>);
      });

      it('should signup successfully', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(authFixedData);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.state).toBe(true);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.token).toBeDefined();
      });

      it('should failed signup on already used information', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(authFixedData);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.state).toBe(false);
        expect(response.body.message).toBeDefined();
      });
    });

    describe('→ POST /auth/signin', () => {
      it('should return 400 on missing dto', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send(authBrokenData);
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeInstanceOf(Array<String>);
      });

      it('should failed signin on invalid information', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send(authUnknownata);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.state).toBe(false);
      })

      it('should signin successfully', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send(authFixedData);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.state).toBe(true);
        expect(response.body.message).toBeDefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.token).toBeDefined();
        token = response.body.data.token;
      });
    });
  });

  describe('User Module', () => {
    describe('User Info', () => {
      it('should require a valid token', async () => {
        const response = await request(app.getHttpServer())
          .get('/users/me');
        expect(response.status).toBe(401);
      });

      it('should return user info with token', async () => {
        const response = await request(app.getHttpServer())
          .get('/users/me')
          .set({ Authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.state).toBe(true);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});