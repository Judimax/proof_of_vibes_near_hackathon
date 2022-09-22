require %{rspec/retry}

RSpec.configure do |config|
    config.default_retry_count = 2
end
