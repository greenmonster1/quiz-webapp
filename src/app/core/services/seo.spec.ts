import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    metaService.removeTag('property="og:url"');
    metaService.removeTag('property="og:image"');
  });

  describe('updateMeta', () => {
    it('should set the document title', () => {
      service.updateMeta({ title: 'Test Title', description: 'Test desc' });
      expect(titleService.getTitle()).toBe('Test Title');
    });

    it('should set the meta description tag', () => {
      service.updateMeta({ title: 'T', description: 'My description' });
      const tag = metaService.getTag('name="description"');
      expect(tag?.content).toBe('My description');
    });

    it('should set og:title', () => {
      service.updateMeta({ title: 'OG Title', description: 'desc' });
      const tag = metaService.getTag('property="og:title"');
      expect(tag?.content).toBe('OG Title');
    });

    it('should set og:description', () => {
      service.updateMeta({ title: 'T', description: 'OG Desc' });
      const tag = metaService.getTag('property="og:description"');
      expect(tag?.content).toBe('OG Desc');
    });

    it('should set og:url when provided', () => {
      service.updateMeta({ title: 'T', description: 'd', url: 'https://example.com' });
      const tag = metaService.getTag('property="og:url"');
      expect(tag?.content).toBe('https://example.com');
    });

    it('should set og:image when provided', () => {
      service.updateMeta({ title: 'T', description: 'd', image: 'https://example.com/img.jpg' });
      const tag = metaService.getTag('property="og:image"');
      expect(tag?.content).toBe('https://example.com/img.jpg');
    });

    it('should not set og:url when not provided', () => {
      service.updateMeta({ title: 'T', description: 'd' });
      const tag = metaService.getTag('property="og:url"');
      expect(tag?.content ?? null).toBeNull();
    });
  });

  describe('setJsonLd', () => {
    it('should create a JSON-LD script tag', () => {
      service.setJsonLd({ '@type': 'Quiz', name: 'Test' });
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
    });

    it('should serialize the schema to JSON', () => {
      const schema = { '@type': 'Quiz', name: 'Knowledge Quiz' };
      service.setJsonLd(schema);
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script?.textContent).toBe(JSON.stringify(schema));
    });

    it('should update existing JSON-LD script instead of creating a duplicate', () => {
      service.setJsonLd({ '@type': 'Quiz', name: 'First' });
      service.setJsonLd({ '@type': 'Quiz', name: 'Second' });
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
      expect(scripts[0].textContent).toContain('Second');
    });
  });
});
