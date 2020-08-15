import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LessonsService } from './lessons.service';
import { environment } from '@env/environment';
import { ServiceSpecUrl, mockLesson } from '../tests.mocks';

describe('LessonsService', () => {
  const model = 'lessons';
  const serviceSpecUrl: ServiceSpecUrl = new ServiceSpecUrl(model);
  let httpTestingController: HttpTestingController;
  let service: LessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LessonsService,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.',() => {

    it('get() on service.all()', () => {
      service.all().subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush([ {...mockLesson} ]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockLesson.id).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockLesson.id));
      req.flush({...mockLesson});
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockLesson).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush({...mockLesson});
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockLesson).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockLesson.id));
      req.flush({...mockLesson});
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockLesson.id).subscribe();
  
      const req = httpTestingController.expectOne(serviceSpecUrl.getUrlWithId(mockLesson.id));
      req.flush({...mockLesson});
      httpTestingController.verify();
    });
    
  });

});
