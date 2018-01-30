
.PHONY: all clean

all: png

clean:
	rm reasonml-architechture.svg reasonml-architechture.png

svg: reasonml-architechture.dot
	dot -Tsvg $< > reasonml-architechture.svg
png: reasonml-architechture.dot
	dot -Tpng $< > reasonml-architechture.png