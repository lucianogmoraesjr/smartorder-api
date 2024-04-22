import { FakeUploader } from 'test/storage/fake-uploader';

import { GetSignedUrlUseCase } from './get-signed-url-use-case';

let fakeUploader: FakeUploader;
let sut: GetSignedUrlUseCase;

describe('Get Signed Url Use Case', () => {
  beforeEach(() => {
    fakeUploader = new FakeUploader();
    sut = new GetSignedUrlUseCase(fakeUploader);
  });

  it('should be able to get a signed url to upload', async () => {
    const { signedUrl } = await sut.execute('file.png');

    expect(signedUrl).toEqual('signed-url-file.png');
  });
});
