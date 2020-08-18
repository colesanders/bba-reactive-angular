import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { ServiceSpecUrl, mockCourse } from '@bba/testing';

describe('CoursesService', () => {
  const model = 'courses';
  const serviceSpecUrl: ServiceSpecUrl = new ServiceSpecUrl(model);
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe();

      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush([{ ...mockCourse }]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockCourse.id).subscribe();

      const req = httpTestingController.expectOne(
        serviceSpecUrl.getUrlWithId(mockCourse.id)
      );
      req.flush({ ...mockCourse });
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockCourse).subscribe();

      const req = httpTestingController.expectOne(serviceSpecUrl.getUrl());
      req.flush({ ...mockCourse });
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockCourse).subscribe();

      const req = httpTestingController.expectOne(
        serviceSpecUrl.getUrlWithId(mockCourse.id)
      );
      req.flush({ ...mockCourse });
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockCourse.id).subscribe();

      const req = httpTestingController.expectOne(
        serviceSpecUrl.getUrlWithId(mockCourse.id)
      );
      req.flush({ ...mockCourse });
      httpTestingController.verify();
    });
  });
});
