
using Microsoft.EntityFrameworkCore;

namespace commentSQL_API.Data
{
  public class DataContext :DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<commentSQL> Comentarios => Set<commentSQL>();
  }
}
