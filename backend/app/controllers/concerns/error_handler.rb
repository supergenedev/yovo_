module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { code: 404, type: "not_found", message: e.message, title: nil }, status: :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { code: 422, type: "error", message: e.message, title: nil }, status: :unprocessable_entity
    end

    rescue_from ActionController::BadRequest do |e|
      render json: { code: 400, type: "error", message: e.message, title: nil }, status: :bad_request
    end

    rescue_from ActionController::ParameterMissing do |e|
      render json: { code: 400, type: "error", message: e.message, title: nil }, status: :bad_request
    end
  end
end
