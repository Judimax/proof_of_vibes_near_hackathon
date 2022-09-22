# puffing billy configuration
require %{billy/capybara/rspec}
Billy.configure do |c|

    # c.cache = true
    c.proxy_port = 64190
    c.record_requests = true
    # c.whitelist <<  %{#{$host}:4202}# to append a host without overriding the defaults.
    # c.whitelist << %{http://127.0.0.1:4202}
    c.whitelist <<  ENV[%{BACKEND_URL}]
    c.whitelist << %{http://127.0.0.1:3005}
    c.proxied_request_port = 4521
    c.logger = nil
    c.record_stub_requests = true
    c.persist_cache = true


  end
  #



