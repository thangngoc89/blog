
.PHONY: all clean

all: reasonml-architechture bsb-vs-jsoo

clean:
	rm *.svg
	rm *.png

reasonml-architechture: reasonml-architechture.dot
	dot -Tsvg $< > reasonml-architechture.svg
	dot -Tpng $< > reasonml-architechture.png

bsb-vs-jsoo: bsb-vs-jsoo.dot
	dot -Tsvg $< > bsb-vs-jsoo.svg
	dot -Tpng $< > bsb-vs-jsoo.png