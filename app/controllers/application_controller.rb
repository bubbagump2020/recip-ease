class ApplicationController < ActionController::Base
    include ActionController::MimeResponds
    protect_from_forgery unless: -> { request.format.json? }

    def fallback_index_html
        render :file => 'public/index.html'
    end

    private

    def current_user
        @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
    end

end
