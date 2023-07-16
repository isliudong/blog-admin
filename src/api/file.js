import request from '@/utils/fileRequest'

export function uploadImage(forms, configs) {
  return request({
    url: '/file',
    method: 'post',
    data: forms,
    headers: { ...configs.headers }
  })
}

