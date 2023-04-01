import { TestBed, waitForAsync } from '@angular/core/testing';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from 'src/app/config/app.config';
import { JwtService } from './jwt.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

let service;
const username = 'devuser';
let tokenMock: Token = {
  sub: '',
  nickname: username,
  name: `trad\\${username}`,
  IpAddress: '::1',
  jti: 'fa6a7ad4-85f7-449e-b70d-0417e5929eef',
  iat: '5/13/2020 5:08:08 PM',
  scope: '',
  roles: ['MiamiBullViewOnly','MiamiBullAdmin','MiamiBullRestartCluster','MiamiBullRestartPod'],
  exp: 1923285600,
  iss: 'TS.BOWI.WEB',
  aud: 'https://miami-bull-ui.dev.tscrypto.io/',
}
let decodeTokenSpy;

describe('JwtService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService,
        JwtService,
        {
          provide: APP_CONFIG,
          useValue: DEFAULT_APP_CONFIG
        }
      ]
    })
    .compileComponents();
    service = TestBed.inject(JwtService);
    decodeTokenSpy = jasmine.createSpy().and.returnValue(tokenMock);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getViewOnlyPermission', () => {
    it('should return true if it has the role', () => {
      expect(service.getViewOnlyPermission()).toBeTruthy();
    });
    it('should return false if it doesnt have the role', () => {
      tokenMock.roles = ['CryptoViewAll2'];
      service.decodeToken = decodeTokenSpy.and.returnValue(tokenMock);
      expect(service.getViewOnlyPermission()).toBeFalsy();
    });
  });
  describe('getEditAdminPermission', () => {
    it('should return true if it has the role', () => {
      expect(service.getEditAdminPermission()).toBeTruthy();
    });
    it('should return false if it doesnt have the role', () => {
      tokenMock.roles = ['CryptoViewAll'];
      service.decodeToken = decodeTokenSpy.and.returnValue(tokenMock);
      expect(service.getEditAdminPermission()).toBeFalsy();
    });
  });
  describe('getRestartPodPermission', () => {
    it('should return true if it has the role', () => {
      expect(service.getRestartPodPermission()).toBeTruthy();
    });
    it('should return false if it doesnt have the role', () => {
      tokenMock.roles = ['CryptoViewAll'];
      service.decodeToken = decodeTokenSpy.and.returnValue(tokenMock);
      expect(service.getRestartPodPermission()).toBeFalsy();
    });
  });
  describe('getRestartClusterPermission', () => {
    it('should return true if it has the role', () => {
      expect(service.getRestartClusterPermission()).toBeTruthy();
    });
    it('should return false if it doesnt have the role', () => {
      tokenMock.roles = ['CryptoViewAll'];
      service.decodeToken = decodeTokenSpy.and.returnValue(tokenMock);
      expect(service.getRestartClusterPermission()).toBeFalsy();
    });
  });
});
