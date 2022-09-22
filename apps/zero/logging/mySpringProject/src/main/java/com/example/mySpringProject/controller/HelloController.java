package com.example.mySpringProject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


// Import log4j classes.
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;


@RestController
public class HelloController {

  private static final Logger logger = LogManager.getLogger(HelloController.class);

  @GetMapping("/helloworld")
  public String helloWorld() {
    return "Hello World!";
  }

  @GetMapping("/log")
  public void logHelloWorld(){
    logger.traceEntry();
    logger.debug("Hello beautiful world.");
    logger.traceExit();

  }
}
