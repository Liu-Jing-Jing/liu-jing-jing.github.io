# -*- coding: utf-8 -*-

print 'Hello World'
print '3+11 =', 3+11
print 45678 + 0x12fd2
print 100 < 99
print 0xff == 255

print 'Learn Python in imooc'


print '''ggggg
test&&&1111"
hahaha~~
Ling's iMac'''

print '中文'
print '''静夜思

床前明月光，
疑是地上霜。
举头望明月，
低头思故乡。
'''
print "Python 字符串的练习题"
print "I'm OK"
print 'Learn "Python" in imooc'
print 'Bob said \"I\'m OK\".', "\\ \ntest\t \\t"

s1 = r'\(~_~)/ \(~_~)/'
s2 = '''Line 1
Line 2
Line 3'''
#s2等价于s3
s3 = 'Line 1\nLine 2\nLine 3'
print s1
print s2

#RAW string测试
print r'''Python is created by "Guido".
It is free and easy to learn.
Let's start learn Python in imooc!'''
print '\n'
rawString = '''"To be, or not to be": that is the question.
Whether it's nobler in the mind to suffer.'''

print rawString

print u'中文'

print u'中文\n日文\n韩文'

unicodeStr = u'''第一行
第二行'''
print unicodeStr

raw2 = ur'''Python的Unicode字符串支持"中文",
"日文",
"韩文"等多种语言'''
print raw2

print (1 + 2.0)
# 相加的结果为浮点数

print (11/4)
# 结果还是整数

# Python中布尔类型
True and True   # ==> True
True and False  # ==> False
False and True  # ==> False
False and False # ==> False

True or True    # ==> True
True or False   # ==> True
False or True   # ==> True
False or False  # ==> False

not True        # ==> False
not False       # ==> True

a = True
print a and 'a=T' or 'a=F'
#1. 在计算 a and b 时，如果 a 是 False，则根据与运算法则，整个结果必定为 False，因此返回 a；如果 a 是 True，则整个计算结果必定取决与 b，因此返回 b。

#2. 在计算 a or b 时，如果 a 是 True，则根据或运算法则，整个计算结果必定为 True，因此返回 a；如果 a 是 False，则整个计算结果必定取决于 b，因此返回 b。

#所以Python解释器在做布尔运算时，只要能提前确定计算结果，它就不会往后算了，直接返回结果。


a = 'python'
print 'hello,', a or 'world'
b = ''
print 'hello,', b or 'world'