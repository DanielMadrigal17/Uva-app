class ExpenseRecordsController < ApplicationController
    before_action :set_expense_record, only: [:show, :edit, :update, :destroy]

  # GET /expense_records
  def index
    @expense_records = ExpenseRecord.all
    render json: @expense_records
  end

  # GET /expense_records/1
  def show
    render json: @expense_record
  end

  # GET /expense_records/new
  def new
    @expense_record = ExpenseRecord.new
  end

  # GET /expense_records/1/edit
  def edit
  end

  # POST /expense_records
  def create
    
    @expense_record = ExpenseRecord.new(expense_record_params)


    if @expense_record.save
      update_quantity_total(@expense_record)
      render json: @expense_record, status: :created
    else
      render json: @expense_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /expense_records/1
  def update
    if @expense_record.update(expense_record_params)
      render json: @expense_record
    else
      render json: @expense_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expense_records/1
  def destroy
    @expense_record.destroy
    head :no_content
  end

  private

  def update_quantity_total(record)
    today_foods_used = ExpenseRecord.where(article: record.article)
                                  .where("DATE(date) = ?", Date.today)
                                  .sum(:foods_used).to_i
    
    yesterday_foods_used = ExpenseRecord.where(article: record.article)
                                      .where("DATE(date) = ?", Date.yesterday)
                                      .sum(:foods_used).to_i

    total_foods_used = today_foods_used + yesterday_foods_used
    record.update_column(:quantitive_total, total_foods_used)
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_expense_record
      @expense_record = ExpenseRecord.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def expense_record_params
      params.require(:expense_record).permit(:responsible_name, :article, :category, :unit_of_measurement, :previous_inventory, :entry, :date, :quantity, :foods_used, :quantitive_total, :final_inventory)
    end
end
