using commentSQL_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;


namespace commentSQL_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CommentController : ControllerBase
  {

    #region Connection

    public static SqlConnection con = new SqlConnection("Data Source=localhost;Initial Catalog=movies;Integrated Security=True;TrustServerCertificate=True;Encrypt=False");
    public static SqlCommand cmd = new SqlCommand("", con);
    public static DataSet ds;
    public static SqlDataAdapter da;
    public static string sql;
    public static BindingSource bs;


    public static DataSet  saveGenCadena(string[] data)
    {

      //String data[] contains: 0 = 'switch' number , 1 = ID , 2 = title_id , 3 = Comment , 4 = publi_name
      //

      string query = "";
      DataSet mensaje;

      
      switch (data[0])
      {
        //Build QUERY for given case
        case "AddComment":

          query = "INSERT INTO entryTable (title_id,comment,publi_name) VALUES ('" + data[2] +
            "','" + data[3] + "','" + data[4] + "');";
          Console.WriteLine("La consulta se construyo asi : " + query);
          // mensaje = "Se construyo ADD.";
          break;

          //Delete comment by given ID
        case "DeleteComment":

          query = "DELETE FROM entryTable WHERE id=" + data[1] + ";";
          Console.WriteLine("La consulta se construyo asi : " + query);
          //mensaje = "Construida consulta DELETE";
          break;

          //Update information on comment
        case "UpdateComment":
          query = " UPDATE entryTable SET title_id = '"
            + data[2] + "', comment='" + data[3]
            + "', publi_name= '" + data[4] + "' WHERE id="
            + data[1] + ";";
          //mensaje = "registro EDIT";

          Console.WriteLine("QUERY  ::  " + query);

          break;


          //Get a list of all comments linked to specific title
        case "ListComment":
          query = " SELECT * FROM entryTable WHERE "
            + "(title_id = '"
            + data[2] + "');";
          //mensaje = "DELETE registro";

          Console.WriteLine("QUERY  ::  " + query);

          break;

      }
      mensaje =  sendQuery(query);

      return mensaje;
    }

    private static  DataSet sendQuery(string query)
    {


      var setDatos = new DataSet();

      try
      {

        var dataAdapter = new SqlDataAdapter(query, con);
        var cmdBuild = new SqlCommandBuilder(dataAdapter);
        //dataAdapter.Fill()

        dataAdapter.Fill(setDatos);
        Console.WriteLine("Se Ingreso QUERY");



        return (setDatos);
      }
      catch (Exception e)
      {
        Console.WriteLine("Error inesperado : " + e.ToString());
        return (setDatos);
        throw;
      }

      return setDatos;
    }

    //Open DB connection
    public static string Conectar()
    {
      try
      {

        if (con.State == ConnectionState.Closed)
        {
          con.Open();
          Console.WriteLine("La conexion esta: " + con.State.ToString());
          return "Estado conexion: Abierta";
        }
        return "No se abrio nueva conexion";

      }
      catch (Exception e)
      {
        Console.WriteLine("Conexion fallida: " + e.Message);
        return ("Conexion Fallida ");

        throw;
      }
    }

    //Close DB connection
    public static string Desconectar()
    {
      try
      {

        if (con.State == ConnectionState.Open)
        {
          con.Close();

          Console.WriteLine("La conexion esta: " + con.State.ToString());
          return ("Estado conexion: Cerrada");
        }
        return "No se cerro la conexion";

      }
      catch (Exception e)
      {
        Console.WriteLine("Desconexion Fallida: " + e.Message);
        return ("Desconexion Fallida ");
        throw;
      }
    }


    #endregion



    #region Requests

    private readonly DataContext _context;

    //Constructor
    public CommentController(DataContext context)
    {
      _context = context;
    }


    //List comments for given title
    [HttpGet]
    //Añadir parametro que pida el objeto.
    public async Task<ActionResult<List<commentSQL>>> GetComments([FromQuery] commentSQL cml)
    {


      List<commentSQL> list = await Build(cml, "ListComment");

     //List<commentSQL> listado = _context.Comentarios
     //List<commentSQL> listado = _context.Comentarios.Where(x => x.title_id == cml.title_id).ToList();
     //List<commentSQL> list = await _context.Comentarios.Where(x => x.title_id == title_id).ToListAsync();

      return Ok(list);
    }

    //Add new comment for specific title
    [HttpPost]
    public async Task<ActionResult<List<commentSQL>>> CreateComment(commentSQL comment)
    {
      if ( comment.title_id == null || comment.title_id == "")
      {
        return BadRequest("Reference to title not included!");
      }

      List<commentSQL> list = await Build(comment, "AddComment");

     

      return Ok(list);
    }

    //Edits comment
    [HttpPut]
    public async Task<ActionResult<List<commentSQL>>> UpdateComment(commentSQL comment)
    {
      
      if (comment.id == null)
      {
        return BadRequest("Comment not found!");
      }

      List<commentSQL> list = await Build(comment, "UpdateComment");

      return Ok(list);

    }


    //Delete comment
    [HttpDelete]
    public async Task<ActionResult<List<commentSQL>>> DeleteComment(commentSQL comment)
    {

      if (comment.id == null)
      {
        return BadRequest("Comment not found!");
      }
      List<commentSQL> list = await Build(comment, "DeleteComment");

      return Ok(list);
    }


    private async Task<List<commentSQL>> Build(commentSQL cml, string com)
    {

      string[] datos = new string[5];
      datos[0] = com;
      datos[1] = cml.id.ToString();
      datos[2] = cml.title_id;
      datos[3] = cml.comment;
      datos[4] = cml.publi_name;
      DataSet data =  saveGenCadena(datos);

      var myData = data.Tables[0].AsEnumerable().Select(r => new commentSQL
      {
        id = r.Field<int>("id"),
        publi_name = r.Field<string>("publi_name"),
        title_id = r.Field<string>("title_id"),
        comment = r.Field<string>("comment"),
      });

      List<commentSQL> list = myData.ToList();

      return list;

    }


    #endregion



  }
}
