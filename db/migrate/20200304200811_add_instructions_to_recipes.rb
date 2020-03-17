class AddInstructionsToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :instruction, :text
  end
end
