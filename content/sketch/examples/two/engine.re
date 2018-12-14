open Js_of_ocaml;

let stderr_buffer = Buffer.create(100);
let stdout_buffer = Buffer.create(100);

Sys_js.set_channel_flusher(stdout, Buffer.add_string(stdout_buffer));
Sys_js.set_channel_flusher(stderr, Buffer.add_string(stderr_buffer));

let execute = code => {
  let code = Js.to_string(code);
  let buffer = Buffer.create(100);
  let formatter = Format.formatter_of_buffer(buffer);
  JsooTop.execute(true, formatter, code);
  
  let result = Buffer.contents(buffer);
  let stderr_result = Buffer.contents(stderr_buffer);
  let stdout_result = Buffer.contents(stdout_buffer);

  Buffer.clear(stderr_buffer);
  Buffer.clear(stdout_buffer);

  [%js {
    val result = Js.string(result);
    val stderr = Js.string(stderr_result);
    val stdout = Js.string(stdout_result)
  }]
};


JsooTop.initialize();
let () = Js.export_all(
  [%js {
    val execute = execute
  }]
);

