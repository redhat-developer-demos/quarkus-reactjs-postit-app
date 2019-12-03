package org.eclipse.chedemos;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.Provider;

import org.jboss.logging.Logger;

@Provider
public class LoggingFilter implements ContainerRequestFilter {
  private static final Logger LOG = Logger.getLogger(LoggingFilter.class);
  
  @Context
  UriInfo info;

  @Context
  HttpServletRequest request;

  @Override
  public void filter(ContainerRequestContext context) {
    LOG.infof("Request %s %s from IP %s",
      context.getMethod(),
      info.getPath(),
      request.getRemoteAddr());
  }
  
}