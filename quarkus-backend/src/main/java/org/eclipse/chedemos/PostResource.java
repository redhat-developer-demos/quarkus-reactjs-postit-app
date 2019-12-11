package org.eclipse.chedemos;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostResource {

  public PostResource() {
  }

  @GET
  public Response list() {
    return Response.ok(Post.listAll()).build();
  }

  @POST
  public Response add(Post post) {
    post.persist();
    return Response.ok(Post.listAll()).build();
  }

  @DELETE
  public Response delete(Post post) {
    post.delete();;
    return Response.ok().build();
  }
}