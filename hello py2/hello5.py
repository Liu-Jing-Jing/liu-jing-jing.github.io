# -*- coding: utf-8 -*-
import math

# 这种写法就是Python特有的列表生成式。利用列表生成式，可以以非常简洁的代码生成 list。
L = [x * x for x in range(1, 11)]

print [x*(x+1) for x in range(1, 100, 2)]
# range(1, 100, 2) 可以生成list [1, 3, 5, 7, 9,...]

d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
tds = ['<tr><td>%s</td><td>%s</td></tr>' % (name, score) for name, score in d.iteritems()]
print '<table>'
print '<tr><th>Name</th><th>Score</th><tr>'
print '\n'.join(tds)
print '</table>'



d = { 'Adam': 95, 'Lisa': 85, 'Bart': 59 }
def generate_tr(name, score):
    if score < 60:
        return '<tr><td>%s</td><td style="color:red">%s</td></tr>' % (name, score)
    return '<tr><td>%s</td><td>%s</td></tr>' % (name, score)

tds = [generate_tr(name, score) for name, score in d.iteritems()]
print '<table border="1">'
print '<tr><th>Name</th><th>Score</th><tr>'
print '\n'.join(tds)
print '</table>'


# 条件过滤
print [x * x for x in range(1, 11) if x % 2 == 0]

def toUppers(L):
    return [x.upper() for x in L if  isinstance(x, str) ]

print toUppers(['Hello', 'world', 101])


# 多层表达式
[m + n for m in 'ABC' for n in '123']
[x+y+z for x in '123456789' for y in '0123456789' for z in '0123456789' if x==z]

print [int(x+y+z) for x in '123456789' for y in '0123456789' for z in '0123456789' if x==z]