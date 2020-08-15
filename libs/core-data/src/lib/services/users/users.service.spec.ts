import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceSpecUrl, mockUser } from '../tests.mocks';

describe('UsersService', () => {
  const model = 'users';
  const serviceSpecUrl: ServiceSpecUrl = new ServiceSpecUrl(model);
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsersService,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.',() => {

    it('get() on service.all()', () => {
      service.all().subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush([ {...mockUser} ]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockUser.id).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockUser.id));
      req.flush({...mockUser});
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockUser).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush({...mockUser});
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockUser).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockUser.id));
      req.flush({...mockUser});
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockUser.id).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockUser.id));
      req.flush({...mockUser});
      httpTestingController.verify();
    });
    
  });
});
