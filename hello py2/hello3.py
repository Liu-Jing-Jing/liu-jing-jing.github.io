# -*- coding: utf-8 -*-
import math
def move(x, y, step, angle):
    newX = x + step * math.cos(angle)
    newY = y - step * math.sin(angle)
    return newX, newY

x, y = move(100, 100, 60, math.pi / 4)
print '(',x,',', y,')'


def quadratic_equation(a, b, c):
    delta = b**2-4*a*c
    if delta >= 0:
        x1 = (-b+math.sqrt(delta))/(2*a)
        x2 = (-b-math.sqrt(delta))/(2*a)
        return x1,x2
    else:
        return

print quadratic_equation(2, 3, 0)
print quadratic_equation(1, -6, 5)
# 在语法上，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值
# 所以，Python的函数返回多值其实就是返回一个tuple，但写起来更方便。

# 递归实现求阶乘的函数
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)

print fact(1)
print fact(10)

# ===> fact(5)的计算过程
# ===> 5 * fact(4)
# ===> 5 * (4 * fact(3))
# ===> 5 * (4 * (3 * fact(2)))
# ===> 5 * (4 * (3 * (2 * fact(1))))
# ===> 5 * (4 * (3 * (2 * 1)))
# ===> 5 * (4 * (3 * 2))
# ===> 5 * (4 * 6)
# ===> 5 * 24
# ===> 120
# 递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以写成循环的方式，但循环的逻辑不如递归清晰。
# 使用递归函数需要注意防止栈溢出。在计算机中，函数调用是通过栈（stack）这种数据结构实现的，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。可以试试计算 fact(10000)。


def move(n, a, b, c):
    if(n == 1):
        print a,'-->',c
        return
    move(n-1,a,c,b);

    move(n-1,b,c,a);

move(4, 'A', 'B', 'C')

print int('1111', 2)



# 定义默认参数.由于函数的参数按从左到右的顺序匹配，所以默认参数只能定义在必需参数的后面
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s

def log(*args):
    print args

log(1,2,3,4,5)

def average(*args):
    if len(args)!=0:
        return sum(args)*1.0/len(args)
    else:
        return 0.0




# 对list的切片
# 对这种经常取指定索引范围的操作，用循环十分繁琐，因此，Python提供了切片（Slice）操作符，能大大简化这种操作。
L = ['Adam', 'Lisa', 'Bart']
# print L[:2] #省略0
print L[1:3]

L = range(1, 101)

print L[0:10]
print L[2::3]
print L[4:50:5]

L = range(1, 101)
print L[-10:]
print L[4::5][-10:]

# 对字符串的切片
print 'ABCDEFG'[:3]
print 'ABCDEFG'[-3:]
print 'ABCDEFG'[::2]