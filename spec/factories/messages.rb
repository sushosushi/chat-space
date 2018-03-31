FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    # image File.open("#{Rails.root}/public/images/no_image.jpg")
    image Rack::Test::UploadedFile.new(File.join(Rails.root, 'public/images/sample.jpeg'))
    user
    group
  end
end
