require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RongCloudChat
  class Application < Rails::Application
    config.watchable_dirs["app/services"] = [:rb]
    config.autoload_paths += ["#{config.root}/app/services/**/*"]
    config.autoload_paths += Dir["#{config.root}/lib/**/"]
    config.active_record.raise_in_transactional_callbacks = true
    config.paths.add "app/services", glob: "*.rb"
    config.api_only = false
  end
end
