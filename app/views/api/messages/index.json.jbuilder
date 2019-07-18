json.array! @new_messages do |message|
  json.content      message.content
  json.image_url    message.image.url
  json.created_at   message.created_at
  json.name         message.user.name
  json.id           message.id
  json.time         message.created_at.to_s
end